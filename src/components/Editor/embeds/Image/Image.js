import React, { Component, createRef } from 'react'
import { store, view } from 'react-easy-state'
import { bind, debounce } from 'decko'

import Input from 'components/UI/Input'
import Button from 'components/UI/Button'
import Popup from 'components/UI/Popup'

import FileUploader from 'components/FileUploader'

import s from './Image.styl';

class Image extends Component {
  @bind
  onFileChoose(url) {
    this.store.url = url;
    this.store.uploaded = false;
  }

  @bind
  onUpload(url) {
    Object.assign(this.store, { url, uploaded: true });
  }

  @bind
  @debounce(500)
  onAltChange(val) {
    this.store.alt = val;
  }

  @bind
  onPopupClose() {
    if (!this.store.inserted) {
      // TODO: remove file from DO Space
    }

    // drop store
    Object.assign(this.store, { url: '', alt: '', inserted: false });
  }

  store = store({
    alt: '',
    url: '',
    inserted: false,
    uploaded: false,
  });

  @bind
  insert() {
    const { tools } = this.props;
    const { alt, url } = this.store;

    tools.insertEmbed('image', { alt, url });
  }

  fileInput = createRef();

  render() {
    const { editor, ...props } = this.props;
    const { uploaded } = this.store;

    return (
      <Popup {...props} outlined horizontal="left" onClose={this.onPopupClose}>
        <Button {...props}>
          Image
        </Button>
        <div className={s.popupContainer}>
          <FileUploader
            className={s.item}
            prefix="post"
            onChange={this.onFileChoose}
            onUpload={this.onUpload}
          />
          <Input
            className={s.item}
            onInput={e => this.onAltChange(e.target.value)}
            placeholder="alt"
          />
          <Button
            className={s.item}
            onClick={this.insert}
            disabled={!uploaded}
            fullWidth
          >
            Insert
          </Button>
        </div>
      </Popup>
    );
  }
}

export default view(Image);
