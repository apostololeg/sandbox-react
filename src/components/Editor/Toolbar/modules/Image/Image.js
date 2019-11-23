import { h, Component, createRef } from 'preact'
import { store, view } from 'preact-easy-state'
import { bind, debounce } from 'decko'

import Input from 'components/UI/Input'
import Button from 'components/UI/Button'
import Popup from 'components/UI/Popup'
import SvgIcon from 'components/UI/SvgIcon'

import FileUploader from 'components/FileUploader'

import Icon from './Image.svg'
import s from './Image.styl'

@view
class Image extends Component {
  fileInput = createRef();

  store = store({
    alt: '',
    url: '',
    inserted: false,
    uploaded: false,
  });

  @bind
  onFileChoose(url) {
    this.store.url = url;
    this.store.uploaded = false;
  }

  @bind
  onUpload(url) {
    Object.assign(this.store, {
      url,
      uploaded: true
    });
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
    Object.assign(this.store, {
      url: '',
      alt: '',
      inserted: false
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
    const { className, ...props } = this.props;
    const { uploaded } = this.store;

    return (
      <Popup
        className={className}
        horizontal="left"
        onClose={this.onPopupClose}
        onApi={api => this.popupApi = api}
      >
        <Button {...props}>
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

export default function(api) {
  return {
    Module: props => <Image {...props} {...api} />
  }
}
