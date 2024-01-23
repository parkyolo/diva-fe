package com.diva.backend.auth.userdetail;

import com.diva.backend.member.entity.Member;
import java.util.ArrayList;
import java.util.Collection;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Getter
public class PrincipalUserDetails implements UserDetails {
    private final Member member;

    // OAuth 로그인 생성자
    public PrincipalUserDetails(Member member) {
        this.member = member;
    }

    @Override
    public String getUsername() {
        return "OAuth2User";
    }

    @Override
    public String getPassword() {
        return null;
    }

    // 해당 User의 권한을 리턴하는 곳
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> authorities = new ArrayList<>();

        authorities.add((GrantedAuthority) () -> member.getRole().toString());

        return authorities;
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
