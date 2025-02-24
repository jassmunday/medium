// Type for signupInput
export type SignupInput = {
    email: string; // Must be a valid email address
    password: string; // Must have a minimum length of 6
    name?: string;    // Optional string
  };
  
  // Type for signinInput
  export type SigninInput = {
    email: string; // Must be a valid email address
    password: string; // Must have a minimum length of 6
  };
  
  // Type for createBlog
  export type CreateBlog = {
    title: string;   // Required string
    content: string; // Required string
  };
  
  // Type for updateBlog
  export type UpdateBlog = {
    title: string;   // Required string
    content: string; // Required string
    id?: string;      // Required string
    AuthorId?: string;      // Required string
  };
  