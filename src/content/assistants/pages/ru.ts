import type { AssistantPagesPack } from '../types';
import roman from './ru/roman';
import alexey from './ru/alexey';
import anna from './ru/anna';
import andrey from './ru/andrey';
import vitaly from './ru/vitaly';
import alexandra from './ru/alexandra';
import ekaterina from './ru/ekaterina';
import pavel from './ru/pavel';
import irina from './ru/irina';
import dmitry from './ru/dmitry';
import kira from './ru/kira';
import misha from './ru/misha';
import olia from './ru/olia';
import masha from './ru/masha';
import liana from './ru/liana';
import shankara from './ru/shankara';
import raya from './ru/raya';
import polina from './ru/polina';

/**
 * Тексты страниц ассистентов — русский, источник переводов.
 *
 * Текст каждого ассистента — свой модуль в ru/: страницы пишут и правят
 * независимо друг от друга, а этот файл только собирает их в пакет языка.
 * Правила наполнения — раздел «Правила текстов» плана
 * docs/superpowers/plans/2026-10-01-assistant-pages.md, примеры разговоров —
 * docs/assistant-pages/examples/<slug>.md.
 */
const ru: AssistantPagesPack = {
  roman,
  alexey,
  anna,
  andrey,
  vitaly,
  alexandra,
  ekaterina,
  pavel,
  irina,
  dmitry,
  kira,
  misha,
  olia,
  masha,
  liana,
  shankara,
  raya,
  polina,
};

export default ru;
