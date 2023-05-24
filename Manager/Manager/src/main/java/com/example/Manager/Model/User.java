package com.example.Manager.Model;

import jakarta.persistence.*;


import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;


import java.io.Serializable;
import java.util.Collection;
import java.util.Date;
import java.util.List;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "User")
public class User implements Serializable, UserDetails {
    private static final long serialVersionUID=1L;
    @Id
    @GeneratedValue (strategy = GenerationType.SEQUENCE, generator = "user_seq")
    @SequenceGenerator(name = "user_seq", sequenceName = "USER_SEQUENCE", allocationSize = 1)
    private int user_id;

   @Column(name = "user_name",unique = true )
    private String userName;

    @Column(name = "user_password")
    private String password;

    private String user_fullName;

//    @Column(name = "user_gender", length = 10, nullable = false)
    private byte user_gender;

//    @Column(name = "user_birthdate", nullable = false)

    private String user_birthdate;

//    @Column(name = "user_phonenum", length = 15, nullable = false, unique = true)
    private String user_phonenum;

//    @Column(name = "user_email", length = 50, nullable = false)
    private String user_email;
//    @Column(name = "user_address", length = 100, nullable = false)
    private String user_address;

//    @Column(name = "user_role", nullable = false)
//    private int user_role;
//    @Column(name = "user_isActivity", nullable = false)
    private Boolean user_isActivity;

    private Date user_cre_date;

    private Date user_mod_date;

    @OneToOne
    @JoinColumn(name = "department", referencedColumnName = "department_id")
    private Department department;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return userName;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}

