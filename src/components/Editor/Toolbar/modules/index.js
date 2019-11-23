import Headers from './Headers'
import Italic from './Italic'
import Bold from './Bold'
import Align from './Align'
import List from './List'
import IndentIncrease from './IndentIncrease'
import IndentDecrease from './IndentDecrease'
import Image from './Image'
import Link from './Link'

const MODULES = [
  Headers,
  Italic,
  Bold,
  Align,
  List,
  IndentDecrease,
  IndentIncrease,
  Link,
  Image
];

/**
 * @param {Object} props – { editor, format, selection }
 */
export default function getModules(props) {
  return MODULES.reduce(
    (acc, m) => {
      const { Module, action, hotkey } = m(props);

      acc.modules.push(Module);

      if (hotkey) {
        acc.actions[hotkey] = action;
      }

      return acc;
    },
    {
      actions: {},
      modules: []
    }
  );
}
