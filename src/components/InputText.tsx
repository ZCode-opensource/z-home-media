import * as React from 'react';

/**
 * Custom input react component
 *
 * @param {object[]} props React props
 * @param {string|number} props.value Variable that contains value of the input
 * @param {string} props.name Name required to handle change and make unique
 * @param {string} [props.placeholder] Text to show inside the input
 * @param {React.ChangeEventHandler} [props.onChange] Handler of input changes
 * @param {string} [props.type] Type of text input (default is text)
 * @returns {React.ReactElement} Returns the custom input react component
 */
export default function InputText(props: {
  value: string | number;
  name: string;
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  type?: string;
}): React.ReactElement {
  const [focusClass, setFocusClass] = React.useState('');
  const [type, setType] = React.useState('text');

  React.useEffect(() => {
    if (props.value.toString().length > 0) {
      setFocusClass('focus');
    }

    if (props.type === 'password') {
      setType('password');
    }
  }, []);

  /**
   * Sets the placeholder to the top when on focus
   */
  function handleFocus() {
    setFocusClass('focus');
  };

  /**
   * Sets the placeholder back if no value is present in the input
   */
  const handleBlur = () => {
    if (props.value.toString().length === 0) {
      setFocusClass('');
    }
  };

  return (
    <div className="input-group">
      <input
        name={props.name}
        type={type}
        className={`input ${focusClass}`}
        defaultValue={props.value}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={props.onChange}
      />
      <label className="placeholder">{props.placeholder}</label>
    </div>
  );
}
