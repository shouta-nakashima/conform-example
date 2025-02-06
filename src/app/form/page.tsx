'use client'

import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { useFormState } from 'react-dom';
import { UserSchema } from './schema';
import { userAction } from './action';
import {useActionState} from "react";

const FormPage = () => {
  const [lastResult, action] = useActionState(userAction, undefined);

  const [form, fields] = useForm({
    // 前回の送信結果を同期
    lastResult,

    // クライアントでバリデーション・ロジックを再利用する
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: UserSchema });
    },

    // blurイベント発生時にフォームを検証する
    shouldValidate: 'onBlur', // 初回バリデーション
    shouldRevalidate: 'onInput', // 再検証のタイミング
  });
  return (
    <form className='flex flex-col gap-2' id={form.id} onSubmit={form.onSubmit} action={action}>
      <div  className='flex flex-col max-w-3xl'>
        <label>Name</label>
        <input
          className='text-black'
          type="text"
          key={fields.name.key}
          name={fields.name.name}
          //defaultValue={fields.name.initialValue}
        />
        <div>{fields.name.errors?.[0]}</div>
      </div>
      <div className='flex flex-col max-w-3xl'>
        <label>Email</label>
        <input
          className='text-black'
          type="email"
          key={fields.email.key}
          name={fields.email.name}
          //defaultValue={fields.email.initialValue}
        />
        <div>{fields.email.errors?.[0]}</div>
      </div>
      <label>
        <div className='flex flex-col max-w-3xl'>
          <span>Age</span>
          <input
            className='text-black'
            type="text"
            key={fields.age.key}
            name={fields.age.name}
            //defaultValue={fields.age.initialValue}
          />
          <div>{fields.age.errors?.[0]}</div>
        </div>
      </label>
      <button className='w-fit bg-white text-blue-300 rounded px-2.5'>submit</button>
    </form>
  );
}

export default FormPage;