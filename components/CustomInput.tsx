import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authFormSchema } from "@/lib/utils";
import { Control, FieldPath } from "react-hook-form";
import { z } from "zod";

const formSchema = authFormSchema("sign-up");

type customInputProps = {
  control: Control<z.infer<typeof formSchema>>;
  placeholder: string;
  name: FieldPath<z.infer<typeof formSchema>>;
  label: string;
}

function CustomInput({control, placeholder, name, label }: customInputProps) {
  return (
    <div>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input
                placeholder={placeholder}
                {...field}
                type={name === "password" ? "password" : "text"}
                className="input-class"
              />
            </FormControl>
            <FormMessage className="form-message mt-2" />
          </FormItem>
        )}
      />
    </div>
  );
}

export default CustomInput;
