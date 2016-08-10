package com.ejx4tut.internalservice.service;

import java.util.HashMap;

import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSON;
import com.tienon.framework.supports.InternalActionResult;

@Service
public class DemoInternalServiceService {

	public InternalActionResult test(HashMap<String, Object> request) {
		System.out.println("request =  " + JSON.toJSONString(request));
		
		return new InternalActionResult();
	}
}
