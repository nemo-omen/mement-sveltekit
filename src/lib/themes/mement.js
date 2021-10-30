import { EditorView } from '@codemirror/view';
import { HighlightStyle, tags } from '@codemirror/highlight';

const mq = window.matchMedia('(prefers-color-scheme: dark)');
const isDark = mq.matches;

const colors = {
  background: isDark ? '#0f131a' : '#eff1f3ff',
  foreground: isDark ? '#eff1f3ff' : '#0f131a',
  activeLine: isDark ? '#19202c' : '#d8e0e9',
  number: isDark ? '#f1cd61' : '#f1cd61',
  parameter: isDark ? '#5bc0eb' : '#009fb7ff',
  cursor: isDark ? '#f1cc50' : '#ff6347',
};

const config = {
  name: 'mement',
  dark: true,
  background: colors.background,
  foreground: colors.foreground,
  selection: '#ff6347',
  cursor: colors.cursor,
  dropdownBackground: '#282A36',
  dropdownBorder: '#191A21',
  activeLine: colors.activeLine,
  matchingBracket: '#44475A',
  keyword: '#ff6347',
  storage: '#ff6347',
  variable: '#F8F8F2',
  parameter: '#F8F8F2',
  function: '#8BE9FD',
  string: '#F1FA8C',
  constant: '#BD93F9',
  type: '#8BE9FD',
  class: '#8BE9FD',
  number: colors.number,
  comment: '#6272A4',
  heading: '#ff6347',
  invalid: '#FF5555',
  regexp: '#F1FA8C',
};
const mementTheme = EditorView.theme(
  {
    '&': {
      color: config.foreground,
      backgroundColor: config.background,
    },
    '.cm-content': { caretColor: config.cursor },
    '&.cm-focused .cm-cursor': {
      borderLeftColor: config.cursor,
    },
    '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, & ::selection': {
      backgroundColor: config.selection,
    },
    '.cm-panels': { backgroundColor: config.dropdownBackground, color: config.foreground },
    '.cm-panels.cm-panels-top': { borderBottom: '2px solid black' },
    '.cm-panels.cm-panels-bottom': { borderTop: '2px solid black' },
    '.cm-searchMatch': {
      backgroundColor: config.dropdownBackground,
      outline: `1px solid ${config.dropdownBorder}`,
    },
    '.cm-searchMatch.cm-searchMatch-selected': {
      backgroundColor: config.selection,
    },
    '.cm-activeLine': { backgroundColor: config.activeLine },
    '.cm-activeLineGutter': { backgroundColor: config.background },
    '.cm-selectionMatch': { backgroundColor: config.selection },
    '.cm-matchingBracket, .cm-nonmatchingBracket': {
      backgroundColor: config.matchingBracket,
      outline: 'none',
    },
    '.cm-gutters': {
      backgroundColor: config.background,
      color: config.foreground,
      border: 'none',
      paddingInline: '0.75rem',
      marginInlineEnd: '0.25rem',
    },
    '.cm-lineNumbers, .cm-gutterElement': { color: 'inherit' },
    '.cm-foldPlaceholder': {
      backgroundColor: 'transparent',
      border: 'none',
      color: config.foreground,
    },
    '.cm-tooltip': {
      border: `1px solid ${config.dropdownBorder}`,
      backgroundColor: config.dropdownBackground,
      color: config.foreground,
    },
    '.cm-tooltip.cm-tooltip-autocomplete': {
      '& > ul > li[aria-selected]': {
        background: config.selection,
        color: config.foreground,
      },
    },
  },
  { dark: config.dark }
);
const mementHighlightStyle = HighlightStyle.define([
  { tag: tags.keyword, color: config.keyword },
  { tag: [tags.name, tags.deleted, tags.character, tags.macroName], color: config.variable },
  { tag: [tags.propertyName], color: config.function },
  { tag: [tags.processingInstruction, tags.string, tags.inserted, tags.special(tags.string)], color: config.string },
  { tag: [tags.function(tags.variableName), tags.labelName], color: config.function },
  { tag: [tags.color, tags.constant(tags.name), tags.standard(tags.name)], color: config.constant },
  { tag: [tags.definition(tags.name), tags.separator], color: config.variable },
  { tag: [tags.className], color: config.class },
  { tag: [tags.number, tags.changed, tags.annotation, tags.modifier, tags.self, tags.namespace], color: config.number },
  { tag: [tags.typeName], color: config.type, fontStyle: config.type },
  { tag: [tags.operator, tags.operatorKeyword], color: config.keyword },
  { tag: [tags.url, tags.escape, tags.regexp, tags.link], color: config.regexp },
  { tag: [tags.meta, tags.comment], color: config.comment },
  { tag: tags.strong, fontWeight: 'bold' },
  { tag: tags.emphasis, fontStyle: 'italic' },
  { tag: tags.link, textDecoration: 'underline' },
  { tag: tags.heading, fontWeight: 'bold', color: config.heading },
  { tag: [tags.atom, tags.bool, tags.special(tags.variableName)], color: config.variable },
  { tag: tags.invalid, color: config.invalid },
  { tag: tags.strikethrough, textDecoration: 'line-through' },
]);
const mement = [mementTheme, mementHighlightStyle];

export { config, mement, mementHighlightStyle, mementTheme };
