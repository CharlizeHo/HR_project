package com.example.Manager.Controller;

import com.example.Manager.Model.Customer;
import com.example.Manager.Reponsittory.CustomerRepository;
import com.example.Manager.exception.ReponseMessage;
import com.example.Manager.exception.UserNotFoundException;
import org.aspectj.weaver.ast.Var;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/customer")
public class CustomerController {
    long millis=System.currentTimeMillis();

    // creating a new object of the class Date
    java.sql.Date date = new java.sql.Date(millis);
        @Autowired
        private CustomerRepository customerRepository;


    @PostMapping("customer/cre")
        Customer newCustomer (@RequestBody Customer newCustomer){

            Customer customer = Customer.builder()
                    .customerName(newCustomer.getCustomerName())
                    .customer_phonenum(newCustomer.getCustomer_phonenum())
                    .customer_address(newCustomer.getCustomer_address())
                    .isAcivity(true)
                    .customer_cre_date(date)
                    .build();
            return customerRepository.save(customer);
        }

        @GetMapping("/getCustomer")
        List<Customer> getAllCustomer(){
            return customerRepository.findAll();
        }

        @GetMapping("/admin/getCustomer/{id}")
        Customer getCustomerbyId(@PathVariable int id){
            return customerRepository.findById(id).orElseThrow(()->new UserNotFoundException(id));
        }

//        @PutMapping("/admin/getCustomer/{id}")
//        Customer updateCustomer(@RequestBody Customer newCustomer, @PathVariable int id){
//            return customerRepository.findById(id).map(customer -> {
//                customer.setCustomer_name(newCustomer.getCustomer_name());
//                customer.setCustomer_phonenum(newCustomer.getCustomer_phonenum());
//                customer.setCustomer_address(newCustomer.getCustomer_address());
//                customer.setCustomer_mod_date(new Date());
//                return customerRepository.save((customer));
//            }).orElseThrow(() -> new DepartmentNotFoundException(id));
//        }

//        @DeleteMapping("/admin/getCustomer/{id}")
//        String deleteCustomer (@PathVariable int id){
//            if (!customerRepository.existsById(id)) {
//                throw new DepartmentNotFoundException(id);
//            }
//            customerRepository.deleteById(id);
//            return "Deleted successfully";
//        }
}

