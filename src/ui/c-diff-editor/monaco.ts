/**
 * 精简版 Monaco 引入。
 *
 * 直接 `import * as monaco from 'monaco-editor'` 会引入 editor.main，
 * 其中包含全部 80+ 种语言的语法与语言服务（json/css/html/ts 等），
 * 使 text-diff 的产物膨胀至 3.16 MB —— 超过 workbox 默认 2 MB 的
 * 预缓存上限，导致该工具离线不可用。
 *
 * diff 编辑器只对纯文本工作（model 语言固定为 'txt'），
 * 因此仅引入 editor.api 与 diff 功能实际所需的 contrib 模块。
 */
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

// diff 编辑器本体
import 'monaco-editor/esm/vs/editor/browser/widget/diffEditor.contribution';

// 编辑体验相关的最小 contrib 集合（原始侧可编辑，故保留撤销/查找/右键菜单等）
import 'monaco-editor/esm/vs/editor/contrib/find/browser/findController';
import 'monaco-editor/esm/vs/editor/contrib/clipboard/browser/clipboard';
import 'monaco-editor/esm/vs/editor/contrib/contextmenu/browser/contextmenu';
import 'monaco-editor/esm/vs/editor/contrib/wordOperations/browser/wordOperations';
import 'monaco-editor/esm/vs/editor/contrib/linesOperations/browser/linesOperations';
import 'monaco-editor/esm/vs/editor/contrib/multicursor/browser/multicursor';
import 'monaco-editor/esm/vs/editor/contrib/caretOperations/browser/caretOperations';
import 'monaco-editor/esm/vs/editor/contrib/cursorUndo/browser/cursorUndo';
import 'monaco-editor/esm/vs/editor/contrib/dnd/browser/dnd';
import 'monaco-editor/esm/vs/editor/contrib/links/browser/links';

import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';

/**
 * 原实现完全没有配置 MonacoEnvironment，monaco 会退回到主线程同步计算 diff，
 * 大文本下会阻塞 UI。这里挂上基础 worker（diff 计算由它承担）。
 */
window.MonacoEnvironment = {
  getWorker: () => new EditorWorker(),
};

export { monaco };
