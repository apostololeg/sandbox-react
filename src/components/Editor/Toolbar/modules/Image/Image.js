import { Component } from 'preact';
import { createStore } from 'justorm/preact';
import { bind, debounce } from 'decko';

import Input from 'components/UI/Input';
import Button from 'components/UI/Button';
import Popup from 'components/UI/Popup';
import SvgIcon from 'components/UI/SvgIcon';

import FileUploader from 'components/FileUploader';

import Icon from './Image.svg';
import s from './Image.styl';

class Image extends Component {
  constructor(props) {
    super(props);
    this.store = createStore(this, {
      alt: '',
      url: '',
      inserted: false,
      uploaded: false,
    });
  }

  @bind
  onFileChoose(url) {
    Object.assign(this.store, { url, uploaded: false });
  }

  @bind
  onUpload(url) {
    Object.assign(this.store, { url, uploaded: true });
  }

  @debounce(500)
  onAltChange(alt) {
    this.store.alt = alt;
  }

  @bind
  onPopupClose() {
    if (!this.store.inserted) {
      // TODO: remove file from DO Space
    }

    Object.assign(this.store, {
      url: '',
      alt: '',
      inserted: false,
    });
  }

  @bind
  insert() {
    const { tools } = this.props;
    const { alt, url } = this.store;

    tools.insertEmbed('image', { alt, url });
    this.popupApi.setOpen(false);
  }

  render() {
    const { className } = this.props;
    const { uploaded } = this.store;

    return (
      <Popup
        className={className}
        horizontal="left"
        onClose={this.onPopupClose}
        onApi={api => (this.popupApi = api)}
      >
        <Button>
          <SvgIcon icon={Icon} size={20} />
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

export default {
  Module: Image,
};
