import { TResponseError } from '@/common/types/response';
import { FormInstance } from 'antd';

/**
 * Handles form errors by mapping the error details to the form fields.
 *
 * @template Values - The type of the form values.
 * @param {FormInstance<Values>} form - The Ant Design form instance.
 * @param {CustomException} customException - The custom exception containing the error details.
 */
export const formErrorHandling = <Values = any>(
  form: FormInstance<Values>,
  customException: TResponseError
) => {
  form.setFields(
    customException.errors?.map((value) => ({
      name: value.path.join('.'),
      errors: [value.message],
    })) || []
  );
};
