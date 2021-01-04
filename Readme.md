# babel-plugin-remove-unused-import

> Fork from babel-plugin-danger-remove-unused-import

## Fork Changes

1. `visitor.Program.enter` -> `visitor.Program.exit`: make sure this plugin comes in after [minify-dead-code-elimination](https://babeljs.io/docs/en/babel-plugin-minify-dead-code-elimination).
2. remove import `binding.path.parentPath` if not referenced, ignoring side effects.
3. rename package to `babel-plugin-remove-unused-import`.

For shrinking the bundled javascript size :smile:

**Note: remove unused import is dangerous**
**because the imported package may have some side effects!**

## Option

```javascript
{
  ignore: ['react']
}
```

## Input

```javascript
import React from 'react'
import Button from 'button'
import _ from 'lodash'
import moment from 'moment'
import { data } from '../some-where'

// ...

const a = {}
a.moment = <Button x={data} />
```

## Output

```diff
import React from 'react'
import Button from 'button'
- import _ from 'lodash'
- import moment from 'moment'
import {data} from '../some-where'

// ...

const a = {}
a.moment = <Button x={data} />
```

## Todo

- [x] Supporting Scope
