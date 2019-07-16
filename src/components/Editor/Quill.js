import Quill from 'quill/core';

import formats from './formats';
import embeds from './embeds';

Quill.register(formats);
embeds.forEach(embed => Quill.register(embed));

export default Quill;
