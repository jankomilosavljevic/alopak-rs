<?php
/**
 * ALOPAK – admin za cene.
 * - Prvi put: postavlja se lozinka (čuva se heširana u admin/secret.php).
 * - Posle: prijava lozinkom, izmena cena, čuvanje u data/prices.json.
 * Bez baze – radi na običnom PHP hostingu (npr. ArenaHost preko FTP-a).
 */

ini_set('session.cookie_httponly', '1');
if (PHP_VERSION_ID >= 70300) {
    session_set_cookie_params(['lifetime' => 0, 'httponly' => true, 'samesite' => 'Lax']);
}
session_start();
header('X-Frame-Options: DENY');
header('X-Content-Type-Options: nosniff');

$JS      = __DIR__ . '/../js/products.js';
$DATADIR = __DIR__ . '/../data';
$PRICES  = $DATADIR . '/prices.json';
$SECRET  = __DIR__ . '/secret.php';

function h($s) { return htmlspecialchars((string)$s, ENT_QUOTES, 'UTF-8'); }

function load_products($jsPath) {
    $raw = @file_get_contents($jsPath);
    if ($raw === false) return ['categories' => [], 'products' => []];
    $s = strpos($raw, '{');
    $e = strrpos($raw, '}');
    if ($s === false || $e === false) return ['categories' => [], 'products' => []];
    $data = json_decode(substr($raw, $s, $e - $s + 1), true);
    if (!is_array($data)) return ['categories' => [], 'products' => []];
    $data += ['categories' => [], 'products' => []];
    return $data;
}

function load_prices($pricesPath) {
    if (!file_exists($pricesPath)) return [];
    $d = json_decode(@file_get_contents($pricesPath), true);
    return is_array($d) ? $d : [];
}

function get_hash($secretPath) {
    if (!file_exists($secretPath)) return '';
    $h = include $secretPath;
    return is_string($h) ? $h : '';
}

$hash   = get_hash($SECRET);
$error  = '';
$notice = '';

/* ---------- 1) PRVO POKRETANJE: postavljanje lozinke ---------- */
if ($hash === '') {
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['new_password'])) {
        $p1 = (string)$_POST['new_password'];
        $p2 = (string)($_POST['new_password2'] ?? '');
        if (strlen($p1) < 6) {
            $error = 'Lozinka mora imati najmanje 6 karaktera.';
        } elseif ($p1 !== $p2) {
            $error = 'Lozinke se ne poklapaju.';
        } else {
            $newHash = password_hash($p1, PASSWORD_DEFAULT);
            $ok = @file_put_contents($SECRET, "<?php\nreturn " . var_export($newHash, true) . ";\n");
            if ($ok === false) {
                $error = 'Ne mogu da upišem admin/secret.php – proverite dozvole foldera admin/ (chmod 755).';
            } else {
                $_SESSION['alopak_admin'] = true;
                session_regenerate_id(true);
                header('Location: index.php');
                exit;
            }
        }
    }
    render_shell('Postavljanje lozinke', function () use ($error) {
        ?>
        <p class="lead">Dobrodošli. Postavite lozinku za pristup administraciji cena. Ovo se radi samo jednom.</p>
        <?php if ($error): ?><div class="alert error"><?= h($error) ?></div><?php endif; ?>
        <form method="post" class="card auth">
            <label>Nova lozinka
                <input type="password" name="new_password" autocomplete="new-password" required>
            </label>
            <label>Ponovite lozinku
                <input type="password" name="new_password2" autocomplete="new-password" required>
            </label>
            <button type="submit" class="btn">Sačuvaj lozinku</button>
        </form>
        <?php
    });
    exit;
}

/* ---------- 2) PRIJAVA ---------- */
if (empty($_SESSION['alopak_admin'])) {
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['password'])) {
        if (password_verify((string)$_POST['password'], $hash)) {
            $_SESSION['alopak_admin'] = true;
            session_regenerate_id(true);
            header('Location: index.php');
            exit;
        } else {
            usleep(600000); // usporava pokušaje pogađanja
            $error = 'Pogrešna lozinka.';
        }
    }
    render_shell('Prijava', function () use ($error) {
        ?>
        <?php if ($error): ?><div class="alert error"><?= h($error) ?></div><?php endif; ?>
        <form method="post" class="card auth">
            <label>Lozinka
                <input type="password" name="password" autocomplete="current-password" autofocus required>
            </label>
            <button type="submit" class="btn">Prijava</button>
        </form>
        <?php
    });
    exit;
}

/* ---------- 3) PRIJAVLJEN: izmena cena ---------- */
if (empty($_SESSION['csrf'])) {
    $_SESSION['csrf'] = bin2hex(random_bytes(16));
}

$data     = load_products($JS);
$products = $data['products'];
$cats     = $data['categories'];

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['save'])) {
    if (!hash_equals($_SESSION['csrf'], (string)($_POST['csrf'] ?? ''))) {
        $error = 'Sesija je istekla. Osvežite stranicu i pokušajte ponovo.';
    } else {
        $showIn  = isset($_POST['show'])  && is_array($_POST['show'])  ? $_POST['show']  : [];
        $priceIn = isset($_POST['price']) && is_array($_POST['price']) ? $_POST['price'] : [];
        $out = [];
        foreach ($products as $p) {
            $id    = $p['id'];
            $price = trim((string)($priceIn[$id] ?? ''));
            $show  = isset($showIn[$id]) && $price !== '';
            if ($price !== '' || $show) {
                $out[$id] = ['show' => $show, 'price' => $price];
            }
        }
        if (!is_dir($DATADIR)) { @mkdir($DATADIR, 0755, true); }
        $json = json_encode($out, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        $ok = @file_put_contents($PRICES, $json, LOCK_EX);
        if ($ok === false) {
            $error = 'Ne mogu da upišem data/prices.json – proverite dozvole foldera data/ (chmod 755).';
        } else {
            $notice = 'Cene su sačuvane i odmah su vidljive na sajtu.';
        }
    }
}

$prices = load_prices($PRICES);

render_shell('Cene proizvoda', function () use ($products, $cats, $prices, $notice, $error) {
    ?>
    <div class="topbar">
        <div>
            <h1>Cene proizvoda</h1>
            <p class="muted">Uključite „Prikaži cenu“ i upišite iznos. Ako je isključeno ili prazno, na sajtu piše <strong>Cena na upit</strong>.</p>
        </div>
        <a class="logout" href="logout.php">Odjava</a>
    </div>

    <?php if ($notice): ?><div class="alert ok"><?= h($notice) ?></div><?php endif; ?>
    <?php if ($error): ?><div class="alert error"><?= h($error) ?></div><?php endif; ?>

    <form method="post">
        <input type="hidden" name="csrf" value="<?= h($_SESSION['csrf']) ?>">
        <?php
        $byCat = [];
        foreach ($products as $p) { $byCat[$p['cat']][] = $p; }
        foreach ($cats as $c):
            if (empty($byCat[$c['id']])) continue;
        ?>
            <section class="card">
                <h2><?= h($c['name']) ?></h2>
                <?php foreach ($byCat[$c['id']] as $p):
                    $id = $p['id'];
                    $cur = isset($prices[$id]) ? $prices[$id] : ['show' => false, 'price' => ''];
                    $checked = !empty($cur['show']) ? 'checked' : '';
                    $val = isset($cur['price']) ? $cur['price'] : '';
                ?>
                    <div class="row">
                        <div class="row__name"><?= h($p['name']) ?></div>
                        <label class="row__show">
                            <input type="checkbox" name="show[<?= h($id) ?>]" value="1" <?= $checked ?>>
                            Prikaži cenu
                        </label>
                        <input class="row__price" type="text" name="price[<?= h($id) ?>]"
                               value="<?= h($val) ?>" placeholder="npr. 1.250,00 din.">
                    </div>
                <?php endforeach; ?>
            </section>
        <?php endforeach; ?>

        <div class="savebar">
            <button type="submit" name="save" value="1" class="btn">Sačuvaj cene</button>
        </div>
    </form>
    <?php
});

/* ---------- zajednički okvir (HTML + stil) ---------- */
function render_shell($title, $body) {
    ?><!DOCTYPE html>
<html lang="sr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="noindex, nofollow">
<title><?= h($title) ?> | ALOPAK admin</title>
<style>
    * { box-sizing: border-box; }
    body { margin: 0; font-family: Arial, Helvetica, sans-serif; background: #eef3f8; color: #12344d; }
    .wrap { max-width: 880px; margin: 0 auto; padding: 28px 18px 80px; }
    h1 { font-size: 26px; margin: 0 0 4px; }
    h2 { font-size: 18px; margin: 0 0 14px; color: #0e548f; }
    .muted { color: #5a7186; font-size: 14px; margin: 0; }
    .lead { color: #486173; }
    .topbar { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; margin-bottom: 18px; }
    .logout { flex-shrink: 0; color: #0e548f; font-weight: 800; text-decoration: none; padding: 8px 14px; border: 2px solid rgba(14,84,143,.3); border-radius: 10px; }
    .logout:hover { background: rgba(14,84,143,.08); }
    .card { background: #fff; border: 1px solid rgba(0,52,98,.12); border-radius: 16px; padding: 20px 22px; margin-bottom: 16px; box-shadow: 0 10px 26px rgba(0,52,98,.06); }
    .card.auth { max-width: 380px; margin: 30px auto; }
    .auth label { display: block; margin-bottom: 14px; font-weight: 700; font-size: 14px; }
    .auth input { width: 100%; margin-top: 6px; padding: 11px 12px; border: 2px solid rgba(0,52,98,.18); border-radius: 10px; font-size: 15px; }
    .row { display: grid; grid-template-columns: 1fr auto 200px; align-items: center; gap: 14px; padding: 11px 0; border-top: 1px solid rgba(0,52,98,.08); }
    .row:first-of-type { border-top: none; }
    .row__name { font-weight: 700; font-size: 15px; }
    .row__show { display: flex; align-items: center; gap: 7px; font-size: 13.5px; color: #486173; white-space: nowrap; }
    .row__show input { width: 18px; height: 18px; }
    .row__price { padding: 9px 11px; border: 2px solid rgba(0,52,98,.18); border-radius: 9px; font-size: 14px; }
    .btn { background: linear-gradient(135deg, #0e548f, #003462); color: #fff; border: none; border-radius: 12px; padding: 13px 24px; font-size: 15px; font-weight: 800; cursor: pointer; }
    .btn:hover { background: linear-gradient(135deg, #003462, #001f3b); }
    .savebar { position: sticky; bottom: 0; padding: 16px 0; background: linear-gradient(180deg, rgba(238,243,248,0), #eef3f8 40%); text-align: right; }
    .alert { padding: 12px 16px; border-radius: 12px; margin-bottom: 16px; font-weight: 700; font-size: 14px; }
    .alert.ok { background: #e3f6ea; color: #1a7a40; }
    .alert.error { background: #fde7e7; color: #b3261e; }
    @media (max-width: 620px) {
        .row { grid-template-columns: 1fr; gap: 8px; }
        .row__price { width: 100%; }
    }
</style>
</head>
<body>
<div class="wrap">
<?php $body(); ?>
</div>
</body>
</html><?php
}
