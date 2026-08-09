/**
 * Куда увести посетителя с канонического русского корня.
 *
 * ВАЖНО: pickRedirect обязана быть самодостаточной — ни импортов, ни
 * замыканий, ни синтаксиса, который не переживёт вставку строкой. Её исходник
 * целиком уезжает в <head> через snippetSource(), поэтому проверяемый код и
 * отгружаемый код — физически один и тот же. Написать логику дважды (раз для
 * тестов, раз строкой для инлайна) — верный способ получить расхождение,
 * которое не поймает ни один тест.
 *
 * Почему редирект, а не только баннер: баннер видят не все и не сразу, а
 * англоязычный посетитель на русской странице уходит за секунды. Почему при
 * этом краулеры исключены: автоматический редирект по языку уводит бота с
 * канонического корня, и русская версия теряет позиции.
 */
export function pickRedirect(input) {
  var pathname = input.pathname;
  var languages = input.languages || [];
  var stored = input.stored;
  var userAgent = input.userAgent || '';
  var published = input.published || [];
  var canonical = input.canonical;

  // Только канонический корень. Тот же HTML лежит в /en/index.html и остальных
  // языковых каталогах — без этой проверки получилась бы петля.
  if (pathname !== '/' && pathname !== '/index.html') return null;

  // Явный выбор языка уважаем: русскоязычный человек с английской системой
  // должен уметь остаться на русском.
  if (stored) return null;

  // Краулеру отдаём канонический корень.
  if (/bot|crawl|spider|slurp|mediapartners/i.test(userAgent)) return null;

  var picked = null;
  for (var i = 0; i < languages.length; i++) {
    var root = String(languages[i]).toLowerCase().split(/[-_]/)[0];
    if (published.indexOf(root) !== -1) {
      picked = root;
      break;
    }
  }

  // Ни один язык браузера не выпущен — английский как международный дефолт.
  if (!picked) picked = published.indexOf('en') !== -1 ? 'en' : canonical;

  if (picked === canonical) return null;
  return '/' + picked + '/';
}

/**
 * Исходник inline-скрипта для <head>. Список выпущенных языков подставляется
 * на сборке из scripts/translated-languages.js — того же источника, из
 * которого строятся пререндер, hreflang и sitemap.
 */
export function snippetSource(published, canonical) {
  return (
    '(function(){try{' +
    'var pick=' + pickRedirect.toString() + ';' +
    'var stored=null;try{stored=localStorage.getItem("ll_lang_choice")}catch(e){}' +
    'var langs=(navigator.languages&&navigator.languages.length)?navigator.languages:[navigator.language];' +
    'var target=pick({pathname:location.pathname,languages:langs,stored:stored,' +
    'userAgent:navigator.userAgent,published:' + JSON.stringify(published) + ',' +
    'canonical:' + JSON.stringify(canonical) + '});' +
    'if(target)location.replace(target+location.search+location.hash);' +
    '}catch(e){}})();'
  );
}
