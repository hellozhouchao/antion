package com.ejx4tut.internalservice.client;

import org.junit.Test;

import com.alibaba.fastjson.JSON;
import com.tienon.framework.io.servlet.InternalServiceSimpleClient;
import com.tienon.framework.supports.InternalActionResult;

public class InternalServiceClientTest {
	String URI = "http://localhost:8080/ejx4tut/internalService";
	
	@Test
	public void test() {
		String serviceId = "internalServiceTest";
		String text = "{a:1}";
		Object request = JSON.parse(text);
		InternalActionResult result = InternalServiceSimpleClient.call(URI, serviceId, request);
		System.out.println(JSON.toJSONString(result));
	}

}
