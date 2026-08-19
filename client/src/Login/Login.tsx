import './Login.css'

function Login(){
  return(
  <div className="login flex items-center min-h-fullmt-6 flex-col justify-center m-8 px-6 py-12 lg:px-8">
    <h1>Login</h1>
    <div className="login-form mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form action="#" method="POST" className="space-y-6">
        <div>
          <div className='flex'>
          <label htmlFor="email" className="block items-start text-sm/6 font-medium text-gray-100">Email</label>
          </div>
          <div className="mt-2">
            <input id="email" type="email" name="email" required  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
          </div>
        </div>

        <div>
          <div className="flex ">
            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-100">Senha</label>
          </div>
          <div className="mt-2">
            <input id="password" type="password" name="password" required  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
          </div>
          
        </div>

        <div>
          <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Entrar</button>
        </div>

        <div>
          <button type="submit" className="flex w-full border border-solid
  justify-center rounded-md b px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Criar sua conta</button>
        </div>
      </form>
    </div>
</div>

  )
}

export default Login;