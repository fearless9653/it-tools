import RandExp from 'randexp';
import { render } from '@regexper/render';
import type { GroupCapture, RegExpExecArrayWithIndices, RegexMatchResult, RegexOptions } from './regex-tester.types';

export function matchRegex(regex: string, text: string, flags: string): RegexMatchResult[] {
  if (regex === '' || text === '') {
    return [];
  }

  let lastIndex = -1;
  const re = new RegExp(regex, flags);
  const results: RegexMatchResult[] = [];
  let match = re.exec(text) as RegExpExecArrayWithIndices;
  while (match !== null) {
    if (re.lastIndex === lastIndex || match[0] === '') {
      break;
    }
    const indices = match.indices;
    const captures: GroupCapture[] = [];
    Object.entries(match).forEach(([captureName, captureValue]) => {
      if (captureName !== '0' && captureName.match(/\d+/)) {
        captures.push({
          name: captureName,
          value: captureValue,
          start: indices[Number(captureName)][0],
          end: indices[Number(captureName)][1],
        });
      }
    });
    const groups: GroupCapture[] = [];
    Object.entries(match.groups || {}).forEach(([groupName, groupValue]) => {
      groups.push({
        name: groupName,
        value: groupValue,
        start: indices.groups[groupName][0],
        end: indices.groups[groupName][1],
      });
    });
    results.push({
      index: match.index,
      value: match[0],
      captures,
      groups,
    });
    lastIndex = re.lastIndex;
    match = re.exec(text) as RegExpExecArrayWithIndices;
  }
  return results;
}

export function buildRegexFlags(options: RegexOptions): string {
  let flags = 'd';
  if (options.global) {
    flags += 'g';
  }
  if (options.ignoreCase) {
    flags += 'i';
  }
  if (options.multiline) {
    flags += 'm';
  }
  if (options.dotAll) {
    flags += 's';
  }
  if (options.unicode) {
    flags += 'u';
  } else if (options.unicodeSets) {
    flags += 'v';
  }
  return flags;
}

export function generateSample(regex: string): string {
  if (!regex) {
    return '';
  }

  try {
    // Remove named capture group syntax for RandExp compatibility
    const cleanRegex = regex.replace(/\(\?\<[^\>]*\>/g, '(?:');
    const randexp = new RandExp(new RegExp(cleanRegex));
    return randexp.gen();
  } catch (_) {
    return '';
  }
}

export async function renderRegexVisualization(regex: string, container: HTMLElement | ShadowRoot): Promise<void> {
  if (!regex || !container) {
    return;
  }

  try {
    // Clear container
    while (container.lastChild) {
      container.removeChild(container.lastChild);
    }

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    await render(regex, svg);
    container.appendChild(svg);
  } catch (_) {
    // Silently fail if rendering fails
  }
}
