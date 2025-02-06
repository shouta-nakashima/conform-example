'use server';

import {parseWithZod} from "@conform-to/zod";
import {UserSchema} from "@/app/form/schema";

export const userAction = async (prevState: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, {
    schema: UserSchema,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  const user = submission.value;
  console.log(user);
}