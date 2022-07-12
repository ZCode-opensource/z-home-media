import * as React from 'react';

/**
 * Custom checkbox component
 *
 * @param {object[]} props React props object
 * @param {boolean} props.checked React props object
 * @param {string} props.label Label of checkbox
 * @param {React.ChangeEventHandler} [props.onChange] Handler of input changes
 * @returns {React.ReactElement} Returns the custom input react component
 */
export default function Checkbox(props: {
  checked: boolean;
  label: string;
  onChange?: React.MouseEventHandler<HTMLDivElement>;
}): React.ReactElement {
  return (
    <div className="checkbox-container" onClick={props.onChange}>
      <div className="checkbox">
        <input
          type="checkbox"
          id="check"
          checked={props.checked}
          readOnly
        />
        <label htmlFor="checkbox"></label>
      </div>
      <div className="checkbox-label">{props.label}</div>
    </div>
  );
}
