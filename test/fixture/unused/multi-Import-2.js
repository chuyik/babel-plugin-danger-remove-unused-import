import {abc} from './abc'
import {aBc} from './abc'
import Def, {def} from './def'
import efg from './efg'
import Gh, {gh} from './gh'
import Hi, {hi} from './hi'
import Jk, {jk} from './jk'
import * as kl from './kl'
import * as Kl from './kl'
import * as kL from './kL'
import {Lm as Lm} from './lm'
import {mn as mn} from './mn'

console.log(aBc)
console.log(Gh)
console.log(hi)
console.log(Jk, jk)
console.log(Kl)
console.log(mn)

export default function init() {
  console.log('ok')
}
