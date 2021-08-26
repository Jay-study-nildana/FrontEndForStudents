import React from 'react';
//the tutorial asks me to use a svg.
//I could not make any svg on my own.
//so got an image from unsplash as I normally do
//and made it into a tiny user.jpg image
// import user from './user.jpg';

//lets import our CSS file
//we are not using this file anymore.
// import styles from './Header.module.css';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { fontFamily, fontSize, gray1, gray2, gray5 } from './Styles';

//arrow function that is set to the Header variable
//An arrow function is an alternative function syntax that was introduced in ES6.
//The arrow function syntax is a little shorter than the original syntax
//and it also preserves the lexical scope of this.
// The function parameters are defined in parentheses and
//the code that the function executes follows a =>, which is often referred to as a fat arrow

// return directly after the fat arrow. This is called an implicit return
// export const Header = () => <div>header</div>;

//below code works with module.css
// export const Header = () => {
//   const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     console.log(e.currentTarget.value);
//   };

//   return (
//     <div className={styles.container}>
//       <a href="./">Question and Answer</a>
//       <input
//         type="text"
//         placeholder="Search The Whole Thing..."
//         onChange={handleSearchInputChange}
//       />
//       <a href="./signin">
//         <UserIcon />
//         <span>Sign In And Get Inside</span>
//       </a>
//     </div>
//   );
// };

//a component for the user icon
//TODO - this could be a separate file - moved to Icons.tsx
// export const UserIcon = () => <img src={user} alt="User Icon" width="12px" />;

import { UserIcon } from './Icons';

import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { useForm } from 'react-hook-form';

type FormData = {
  search: string;
};

export const Header = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const [searchParams] = useSearchParams();
  //default value for the search box is going to be the criteria route query parameter
  const criteria = searchParams.get('criteria') || '';
  //state that we can store the search value in, defaulting it to the criteria variable
  // const [search, setSearch] = React.useState(criteria);

  const navigate = useNavigate();
  //implementation of the submit handler
  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  // };

  const submitForm = ({ search }: FormData) => {
    navigate(`search?criteria=${search}`);
  };
  return (
    <div
      css={css`
        position: fixed;
        box-sizing: border-box;
        top: 0;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 20px;
        background-color: #fff;
        border-bottom: 1px solid ${gray5};
        box-shadow: 0 3px 7px 0 rgba(110, 112, 114, 0.21);
      `}
    >
      <Link
        to="/"
        css={css`
          font-size: 24px;
          font-weight: bold;
          color: ${gray1};
          text-decoration: none;
        `}
      >
        Q & A
      </Link>
      <form onSubmit={handleSubmit(submitForm)}>
        <input
          {...register('search')}
          defaultValue={criteria}
          placeholder="type here"
          type="text"
          css={css`
            box-sizing: border-box;
            font-family: ${fontFamily};
            font-size: ${fontSize};
            padding: 8px 10px;
            border: 1px solid ${gray5};
            border-radius: 3px;
            color: ${gray2};
            background-color: white;
            width: 200px;
            height: 30px;
            //this is a psuedo class
            :focus {
              outline-color: ${gray5};
            }
          `}
        />
      </form>
      <Link
        to="signin"
        css={css`
          font-family: ${fontFamily};
          font-size: ${fontSize};
          padding: 5px 10px;
          background-color: transparent;
          color: ${gray2};
          text-decoration: none;
          cursor: pointer;
          :focus {
            outline-color: ${gray5};
          }
        `}
      >
        <UserIcon />
        <span
          css={css`
            margin-left: 7px;
          `}
        >
          Sign In
        </span>
      </Link>
    </div>
  );
};
