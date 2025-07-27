import { useForm, FormProvider } from "react-hook-form";

const CustomForm = ({
  children,
  onSubmit,
  onError,
  defaultValues,
  resolver,
  className = "",
}) => {
  const formConfig = {};
  if (defaultValues) formConfig.defaultValues = defaultValues;
  if (resolver) formConfig.resolver = resolver;

  const methods = useForm(formConfig);

  const submitHandler = (data) => {
    onSubmit(data);
    methods.reset();
  };

  return (
    <FormProvider {...methods}>
      <form
        className={className}
        onSubmit={methods.handleSubmit(submitHandler, onError)}
      >
        {children}
      </form>
    </FormProvider>
  );
};

export default CustomForm;
