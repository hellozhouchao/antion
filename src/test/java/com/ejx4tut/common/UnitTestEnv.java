package com.ejx4tut.common;

import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({ 
	"classpath:spring/spring-datasource.xml", 
	"classpath:spring/spring-framework.xml", 
	"classpath:spring/spring-persistence.xml",
	"classpath:spring/spring-ejx4component.xml",
	"classpath:spring/spring-component.xml",
	"classpath:spring/spring-ejx4web.xml",
	
	"classpath:spring/spring-tut.xml"
	})

public class UnitTestEnv {

	@Autowired
	protected ApplicationContext applicationContext;

}