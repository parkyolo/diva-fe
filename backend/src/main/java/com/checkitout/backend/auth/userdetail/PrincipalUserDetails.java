package com.checkitout.backend.auth.userdetail;

import com.checkitout.backend.entity.Member;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

@Getter
public class PrincipalUserDetails implements UserDetails, OAuth2User {
    private final Map<String, Object> attributes;
    private final Member member;

    // OAuth 로그인 생성자
    public PrincipalUserDetails(Member member, Map<String, Object> attributes) {
        this.member = member;
        this.attributes = attributes;
    }

    @Override
    public String getUsername() {
        return "OAuth2User";
    }

    @Override
    public String getPassword() {
        return null;
    }

    @Override
    public String getName() {
        return this.member.getNickname();
    }

    @Override
    public Map<String, Object> getAttributes() {
        return this.attributes;
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
