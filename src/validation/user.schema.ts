import { object, string, number, array, TypeOf } from "zod";


/**
 * @openapi
 * components:
 *  schemas:
 *    CreateUserInput:
 *      type: object
 *      required:
 *        - email
 *        - name
 *        - password
 *        - passwordConfirmation
 *      properties:
 *        email:
 *          type: string
 *          default: jane.doe@example.com
 *        name:
 *          type: string
 *          default: Jane Doe
 *        password:
 *          type: string
 *          default: stringPassword123
 *        passwordConfirmation:
 *          type: string
 *          default: stringPassword123
 *    CreateUserResponse:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *        name:
 *          type: string
 *        _id:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */
const payload = {
  body: object({
    email: string({
      required_error: "Email is required",
    }).email(),
    firstName: string({
      required_error: "First name is required",
      invalid_type_error: "First name must be a string",
    }),
    lastName: string({
      required_error: "Last name is required",
      invalid_type_error: "Last name must be a string",
    }),
    password: string({
      required_error: "Password is required",
    })
      .min(6, { message: "Password must be at least 6 characters long" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[!@#$%^&*()_+{}\[\]\:;'"/\\?,-.]/, {
        message: "Password must contain at least one special character",
      }),
    confirmPassword: string({
      required_error: "Confirm password is required",
    }).min(6, "Confirm password must be at least 6 characters"),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  }),
};

export const SignUpSchema = object({
  ...payload,
});

export type SignUpInput = TypeOf<typeof SignUpSchema>;
