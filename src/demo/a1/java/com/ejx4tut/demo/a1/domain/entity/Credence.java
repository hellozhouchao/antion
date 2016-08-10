package com.ejx4tut.demo.a1.domain.entity;

import java.util.Date;

import com.tienon.framework.supports.UuidGen;

/**
 * 用户凭证关系模型
 * 
 * 数据库表:tab_user_credence
 * @author smz
 * 
 * 
 */
public class Credence {

	private String credenceId;
	private String userId;// 用户
	private String authTypeCode;// 认证方式
	private String credenceExp;// 凭证有效期
	private String remark;// 备注
	private Date st;

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public Credence() {
		this.credenceId = UuidGen.uuid32();
	}

	public Date getSt() {
		return st;
	}

	public void setSt(Date st) {
		this.st = st;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getCredenceId() {
		return credenceId;
	}

	public void setCredenceId(String credenceId) {
		this.credenceId = credenceId;
	}

	public String getAuthTypeCode() {
		return authTypeCode;
	}

	public void setAuthTypeCode(String authTypeCode) {
		this.authTypeCode = authTypeCode;
	}

	public String getCredenceExp() {
		return credenceExp;
	}

	public void setCredenceExp(String credenceExp) {
		this.credenceExp = credenceExp;
	}

}
