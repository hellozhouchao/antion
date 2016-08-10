package com.ejx4tut.unittest;

import javax.annotation.Resource;

import org.junit.Test;

import com.alibaba.fastjson.JSON;
import com.ejx4tut.common.UnitTestEnv;
import com.tienon.web.domain.OrgInfo;
import com.tienon.web.mapper.OrgInfoMapper;

public class OrgInfoMapperTest extends UnitTestEnv {
	@Resource
	OrgInfoMapper orgInfoMapper;
	
	@Test
	public void xx() {
		OrgInfo o = orgInfoMapper.selectByNo("2");
		String s = JSON.toJSONString(o);
		System.out.println(s);
	}
}
