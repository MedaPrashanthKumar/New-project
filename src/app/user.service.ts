import { HttpClient } from '@angular/common/http';
import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable ,Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private subject = new Subject<any>();
  userCartSize:number=0;
  constructor(private hc:HttpClient,private router:Router) { }

  // create user
  createUser(userObj):Observable<any>{
    return this.hc.post("/user/register",userObj)
  }

  
// login user
  loginUser(usercredobj):Observable<any>{

    console.log("in service",usercredobj)
    return this.hc.post("/user/login",usercredobj)
  }


  // logout
  logoutUser(){
    localStorage.clear();
   this.router.navigateByUrl("/home")

  }

  LoginStatusMethod(loginstate){
  this.subject.next(loginstate)
  }

  receiveLoginState():Observable<any>{
    return this.subject.asObservable();
  }
  
  getProfileDetails(username):Observable<any>{
    return this.hc.get(`/user/getsingleuserprofiledetail/${username}`)
  }

// -----------------------------CATEGORIES--------------------------
// dals-pulses
getdals():Observable<any>{
  // console.log("hi iam dals")
return this.hc.get("/product/getproductsofdals")
}

// flours-grains
getfloursgrains():Observable<any>{
  // console.log("hi iam floursgrains")
return this.hc.get("/product/getfloursgrains")
}

// riceproducts
getriceproducts():Observable<any>{
  // console.log("hi iam floursgrains")
return this.hc.get("/product/getriceproducts")
}

// dryfruits
getdryfruits():Observable<any>{
  // console.log("hi iam floursgrains")
return this.hc.get("/product/getdryfruits")
}





// ----------------------------USER Cart------------



setCartSize(newSize){
  this.userCartSize=newSize;
}
getCartSize(){
  return this.userCartSize;
}
getInitialCartSize(username):Observable<any>{
  return this.hc.get(`/cart/getsize/${username}`)
}

// delete product by id in user cart
deleteprodfromcart(item):Observable<any>{
  console.log("deleted item from service cart is here",item)
return this.hc.post("/product/removeprodfromcart",item)
}

cartsize=0;
private cartSubject: BehaviorSubject<any> = new BehaviorSubject(this.cartsize);

  getCartSubjectSize(): Observable<any> {
      return this.cartSubject.asObservable();
  }

  setCartSubjectSize(cartsize: any) {
      this.cartSubject.next(cartsize);
  }


}