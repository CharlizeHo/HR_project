package com.example.Manager.Config;


import com.example.Manager.Reponsittory.UserReponsitory;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.http.parser.Authorization;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
public class ApplicationConfig {

    @Autowired
    private final UserReponsitory reponsitory;
  @Bean
    // khi dùng @Bean nên public đối tượng
    public UserDetailsService userDetailsService(){
        return userName -> reponsitory.findByUserName(userName)
                .orElseThrow(()->new UsernameNotFoundException(" "));
    }

   @Bean
    public AuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider authProvider= new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());
        return  authProvider;
    }

  @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws  Exception{
        return config.getAuthenticationManager();
    }
  @Bean
    public PasswordEncoder passwordEncoder() {
        return  new BCryptPasswordEncoder();
    }
}
