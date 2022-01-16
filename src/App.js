import { Routes, Route, BrowserRouter } from "react-router-dom";
import PrivateRoute from "./route/routes";
import BlogsPage from "./screens/Blogs";
import HomePage from "./screens/HomePage";
import LoginPage from "./screens/Login";
import './styles/signup_form.css'
import './styles/blog_card.css'
import SignUpPage from "./screens/SignUp";
import BloggerssPage from "./screens/Bloggers";
import AdminUsers from "./screens/AdminUsers";
import EditorJs from "./screens/EditorPage";
import BloggerDetail from "./screens/BlogDetail";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Navbar /> */}
          <Route path='/' element={<HomePage />} />
          <Route path='blogs' element={<BlogsPage />} />
          <Route path='blogs/:id' element={<BloggerDetail />} />
          <Route path='login' element={<LoginPage />} />
          <Route path='register' element={<SignUpPage />} />

          <Route element={<PrivateRoute routeRole='admin' />}>
            <Route path='/admin/blogs' element={<BlogsPage />}>
            </Route>
          </Route>

          <Route element={<PrivateRoute routeRole='admin' />}>
            <Route path='/admin/bloggers' element={<BloggerssPage />}>
            </Route>
          </Route>

          <Route element={<PrivateRoute routeRole='admin' />}>
            <Route path='/admin/users' element={<AdminUsers />}>
            </Route>
          </Route>

          <Route element={<PrivateRoute routeRole='blogger' />}>
            <Route path='/blogger/blogs' element={<BlogsPage />}>
            </Route>
          </Route>

          <Route element={<PrivateRoute routeRole='blogger' />}>
            <Route path='/blogger/create' element={<EditorJs />}>
            </Route>
          </Route>

          <Route element={<PrivateRoute routeRole='admin' />}>
            <Route path='/admin/' element={<HomePage />}>
              {/* <Route path='dashboard' element={<Dashboard />} /> */}
              <Route path='blogs' element={<BlogsPage />} />
              {/* <Route path='users' element={<Users />} />
              <Route path='bloggers' element={<Bloggers />} />
              <Route path='blogs/:id' element={<ViewBlog />} /> */}
            </Route>
          </Route>

          <Route element={<PrivateRoute routeRole='blogger' />}>
            <Route path='/blogger/blog' element={<BlogsPage />}>
              {/* <Route path='create-blog' element={<CreateBlog />} />
              <Route path='my-blogs' element={<MyBlogs />} />
              <Route path='my-blogs/:id' element={<ViewBlog />} /> */}
            </Route>
          </Route>

          <Route
            path='*'
            element={
              <main style={{ padding: 100 }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>

      </BrowserRouter>
    </>
  );
}



export default App;
