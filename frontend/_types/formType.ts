type FormType = {
  _id?: string;
  title: string;
  description: string;
  questions: {
    value: string;
    type: string;
    options?: string[];
    required?: boolean;
  }[];
};
export default FormType;
