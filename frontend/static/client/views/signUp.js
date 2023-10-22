import AbstractView from "./AbstractView.js";
import Validator from "../../admin/data/validate.js";
import errPage from "../components/errPage.js";
import { createUser, getUser, getUserByID } from "../../admin/data/user.js";
import { router } from "../index.js";
import $ from "jquery";
export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Viewing login");
  }

  async getHtml() {
    var user = sessionStorage.getItem("idUserLogin");
    if (user) {
      return errPage();
    }
    return `
    <!-- component -->
    <div class="bg-white dark:bg-gray-900 container w-4/5 m-auto ">
                <div class="flex items-center w-full max-w-md py-10 mx-auto lg:w-2/6">
                    <div class="flex-1">
                        <div class="text-center">
                            <h2 class="text-4xl font-bold text-center text-gray-700 dark:text-white">WELCOME</h2>
                            
                            <p class="mt-3 text-gray-500 dark:text-gray-300">Sign up to access your account</p>
                        </div>
    
                        <div class="mt-2 flex flex-col gap-3">
                                <p class=" text-red-500 checkSignUp"></p>
                                <div>
                                    <label for="name" class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Full name</label>
                                    <input type="text" name="name" id="name" placeholder="Nguyễn Văn A" class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                </div>
                                <div>
                                    <label for="name" class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Your phone</label>
                                    <input type="text" name="phone" id="phone" placeholder="0908999999" class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                </div>
                                <div>
                                    <label for="email" class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email Address</label>
                                    <input type="email" name="email" id="email" placeholder="example@example.com" class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                </div>
                                <div class="">
                                    <div class="flex justify-between mb-2">
                                        <label for="password" class="text-sm text-gray-600 dark:text-gray-200">Password</label>
                                    </div>
    
                                    <input type="password" name="password" id="password" placeholder="Your Password" class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                </div>
                                <div class="">
                                    <div class="flex justify-between mb-2">
                                        <label for="password" class="text-sm text-gray-600 dark:text-gray-200">Re Password</label>
                                    </div>

                                    <input type="password" name="rePassword" id="re-password" placeholder="Your Password" class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                </div>
                                <div class="">
                                    <button
                                        class="btn-signUp w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                        Sign in
                                    </button>
                                </div>
                            
                            <p class=" text-sm text-center text-gray-400">Bạn đã có tài khoản <a href="/login" data-link class="text-blue-400">đăng nhập</a></p>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
        `;
  }
}

$(document).on("click", ".btn-signUp",async function () {
  var name = $('input[name="name"]');
  var phone = $('input[name="phone"]');
  var email = $('input[name="email"]');
  var pass = $('input[name="password"]');
  var rePass = $('input[name="rePassword"]');

  if (
    Validator.valName(name) &&
    Validator.valPhone(phone) &&
    Validator.valEmail(email) &&
    Validator.valPassword(pass)
  ) {
    if (pass.val() != rePass.val()) {
      $(".checkSignUp").html("Mật khẩu nhập lại không giống");
      rePass.css('border','1px solid red')
    } else {
        var users = await getUser()
        var checkUser = users.find(item=>{
            return item.email == email.val()
        })
        if(checkUser){
            $(".checkSignUp").html("Email đã được sử dụng");
            email.css('border','1px solid red')
        }else{
            var data = {
                name : name.val(),
                phone: phone.val(),
                email: email.val(),
                password: pass.val(),
                thumb:'avata.jpg',
                role: 1
            }
            var idUser = await createUser(data)
            var user = await getUserByID(idUser.id)
            sessionStorage.setItem("idUserLogin", user.id);
            sessionStorage.setItem("emailMess", user.email);
            sessionStorage.setItem("nameMess", user.name);
            $('.itemLogin').html('<i class="pr-1 fa fa-user-circle-o" aria-hidden="true"></i>'+user.name)
            $('.itemLogin').attr('href','/detail-user')
            history.pushState(null, null, '/detail-user');
            router();
        }
    }
  }
});
