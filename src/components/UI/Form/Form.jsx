import { h, Component } from 'preact'
import { store, view } from 'preact-easy-state'
import cn from 'classnames'
import { bind } from 'decko'
import Validator from 'fastest-validator'
import compare from 'compareq'
import nanoid from 'nanoid'

import Input from '../Input'

import s from './Form.styl'

const FORM_STORES = {};

const Field = (formId, handleChange) => view(props => {
  const {
    component: Control = Input,
    className,
    onChange,
    clearMargins,
    ...controlProps
  } = props;
  const { values, changed, errors } = FORM_STORES[formId];
  const { name, hidden } = controlProps;

  const valField = props.type === 'checkbox' ? 'checked' : 'value';
  const classes = cn(
    className,
    s.field,
    changed[name] && s.changed,
    clearMargins && s.clearMargins,
    hidden && s.hidden
  );

  Object.assign(controlProps, {
    name,
    [valField]: values[name],
    onChange: e => {
      if (onChange && onChange(e) === false) {
        return;
      }

      const val = typeof e === 'string' ? e : e.target[valField]

      handleChange(name, val);
    }
  });

  return (
    <div className={classes}>
      <Control {...controlProps} />
      {changed[name] && errors[name] && (
        <div className={s.error}>{errors[name].message}</div>
      )}
    </div>
  );
});

/**
 * Form
 *
 * @property {Object} initialValues
 * @property {Object} validationSchema
 * @property {JSX} children
 */
class Form extends Component {
  constructor(props) {
    super(props);

    const { validationSchema, initialValues } = props;

    this.formId = nanoid();
    this.store = FORM_STORES[this.formId] = store({}); // eslint-disable-line

    this.setInitialVals(initialValues);
    this.setValidation(validationSchema);

    this.calcChangedAll(initialValues);
    this.validate();
  }

  shouldComponentUpdate({ initialValues, validationSchema }) {
    const validationChanged = !compare(validationSchema, this.props.validationSchema);
    const initialValsChanged = !compare(initialValues, this.props.initialValues);

    if (initialValsChanged) {
      this.setInitialVals(initialValues);
    }

    if (validationChanged) {
      this.setValidation(validationSchema);
    }

    if (initialValsChanged) {
      this.calcChangedAll(initialValues);
    }

    if (initialValsChanged || validationChanged) {
      this.validate();
    }

    return true
  }

  setInitialVals(initialValues) {
    this.field = Field(this.formId, this.onChange);
    this.store.values = { ...initialValues };
  }

  setValidation(validationSchema) {
    this.check = validationSchema
      ? this.getCompileSchema(validationSchema)
      : null;
  }

  @bind
  setValue(field, val) {
    const { values } = this.store;

    values[field] = val;
    this.calcChanged(field, val);
    this.validate();
  }

  @bind
  setValues(vals) {
    const { values } = this.store;

    Object.assign(values, vals);
    this.calcChangedAll();
    this.validate();

    return values;
  }

  getCompileSchema(validationSchema) {
    const { values } = this.store;
    const customMessages = {};
    const schema = Object.entries(validationSchema).reduce(
      (acc, [field, { check, messages, ...val }]) => {
        const fieldSchema = { ...val };

        if (val.type === 'custom') {
          fieldSchema.check = function checkWrap(...args) {
            return check.call(this, ...args, values)
          };

          if (messages) {
            Object.assign(customMessages, messages);
          }
        }

        return {
          ...acc,
          [field]: fieldSchema
        };
      },
      {}
    );

    const validator = new Validator({ messages: customMessages });

    return validator.compile(schema);
  }

  calcChanged(field, val) {
    const { initialValues } = this.props;
    const { changed } = this.store;

    if (val === initialValues[field]) {
      delete changed[field];
    } else {
      changed[field] = true;
    }

    this.store.isDirty = Object.keys(changed).length > 0;
  }

  calcChangedAll(initialValues = this.props.initialValues) {
    const { values } = this.store;

    if (!values) {
      return;
    }

    const changed = Object.entries(values).reduce(
      (acc, [field, val]) =>
        initialValues[field] !== val
          ? { ...acc, [field]: true }
          : acc,
      {}
    );

    Object.assign(this.store, {
      changed,
      isDirty: Object.keys(changed).length > 0
    });
  }

  validate() {
    const { values } = this.store;
    const checkRes = this.check ? this.check(values) : true;
    const isValid = checkRes === true;
    const errors = isValid ? {} : checkRes.reduce(
      (acc, { field, ...rest }) => ({ ...acc, [field]: rest }),
      {}
    );

    Object.assign(this.store, { isValid, errors });
  }

  @bind
  onSubmit(e) {
    const { onSubmit } = this.props;
    const { values } = this.store;

    e.preventDefault();
    onSubmit({ ...values });
  }

  @bind
  onChange(field, val) {
    const { onChange } = this.props;
    const { values } = this.store;

    if (values[field] === val) {
      return
    }

    values[field] = val;
    this.handleChange(field, val);
    onChange && onChange({ ...values }); // eslint-disable-line
  }

  handleChange(field, val) {
    this.calcChanged(field, val);
    this.validate();
  }

  render() {
    const {
      className,
      loading,
      initialValues,
      validationSchema,
      children,
      onChange,
      onSubmit,
      ...props
    } = this.props;
    const { isDirty, isValid, values } = this.store;
    const classes = cn(className, loading && s.loading);
    const api = {
      isDirty,
      isValid,
      Field: this.field,
      form: {
        values,
        setValue: this.setValue,
        setValues: this.setValues
      }
    };

    return (
      <form onSubmit={this.onSubmit} {...props} className={classes}>
        {children(api)}
      </form>
    );
  }
}

export default view(Form);
export SubmitButtons from './SubmitButtons';
