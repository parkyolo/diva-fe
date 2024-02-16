package com.diva.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

@Getter
public class DeviceTokenDto {
    @NotNull
    private long id;

    @NotNull
    private long memberId;

    @NotBlank
    private String deviceToken;

    @NotNull
    private Long refreshTokenId;

    @Builder
    protected DeviceTokenDto(long id, long memberId, String deviceToken, long refreshTokenId) {
        this.id = id;
        this.memberId = memberId;
        this.deviceToken = deviceToken;
        this.refreshTokenId = refreshTokenId;
    }
}
