package com.diva.backend.member.exception;

import com.diva.backend.common.exception.ErrorCode;


public enum MemberErrorCode implements ErrorCode {

    MEMBER_NOT_FOUND("회원 정보를 찾을 수 없습니다.", "MEM_001", 401);

    private String message;
    private String errorCode;
    private int statusCode;

    MemberErrorCode(String message, String errorCode, int statusCode) {
        this.message = message;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
    }

    @Override
    public String getMessage() {
        return this.message;
    }

    @Override
    public String getErrorCode() {
        return this.errorCode;
    }

    @Override
    public int getStatusCode() {
        return this.statusCode;
    }

}
