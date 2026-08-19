import './Register.css'

function Register(){
    return(
        <div className="register-form mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form action="#" method="POST" className="space-y-6">
                <div>
                    <div className='flex'>
                        <label htmlFor="name" className="block items-start text-sm/6 font-medium text-gray-100">Nome</label>
                    </div>
                    <div className="mt-2">
                        <input id="name" type="text" name="name" required  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                    </div>
                </div>

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
                        <label htmlFor="password" className="block text-sm/6 font-medium text-gray-100">Crie sua senha</label>
                    </div>
                    <div className="mt-2">
                        <input id="password" type="password" name="password" required  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                    </div>
                </div>

                <div>
                    <div className="flex ">
                        <label htmlFor="comfirm_password" className="block text-sm/6 font-medium text-gray-100">Confirme sua senha</label>
                    </div>
                    <div className="mt-2">
                        <input id="comfirm_password" type="password" name="comfirm_password" required  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                    </div>

                </div>

                <div>
                    <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Cadastrar</button>
                </div>


            </form>
            
            <div className="mt-2">
                <a href="/">Voltar para Login</a>
            </div>
    </div>
    )
}

export default Register;