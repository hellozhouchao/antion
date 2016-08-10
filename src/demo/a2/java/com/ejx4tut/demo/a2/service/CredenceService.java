package com.ejx4tut.demo.a2.service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ejx4tut.demo.a1.domain.entity.Credence;
import com.ejx4tut.demo.a1.mapper.CredenceMapper;
import com.tienon.framework.persistence.mybatis.paginator.domain.PageBounds;
import com.tienon.framework.persistence.mybatis.paginator.domain.PageList;
import com.tienon.framework.supports.ActionResult;
import com.tienon.framework.supports.InternalActionResult;
import com.tienon.web.support.PageGrid;
import com.tienon.web.support.PageResult;

@Service
public class CredenceService {
	@Resource
	CredenceMapper credenceMapper;

	public ActionResult add(Credence credence) {
		// TODO: 参数检查之类的
		credence.setSt(new Date());
		credence.setCredenceExp("20150101");
		credenceMapper.insert(credence);
		ActionResult result = new ActionResult(true, "数据已插入", credence);
		return result;
	}
	

	// 以下是A4练习部分

	@Transactional
	public Object listCredence(PageGrid input) {
		int page = input.getPage();
		int pageSize = input.getRows();
		PageBounds pageBounds = new PageBounds(page, pageSize, true);
		PageList<Credence> rows = credenceMapper.selectList(input.getSearchCondition(), pageBounds);
		// 获得结果集条总数
		int total = rows.getPaginator().getTotalCount();
		return new ActionResult(new PageResult(total, rows));
	}

	// 和 listCredence() 等价
	@Transactional
	public Object listCredence2(PageGrid input) {
		PageList<Credence> rows = credenceMapper.selectList(input.getSearchCondition(), input.getPageBounds());
		return new ActionResult(new PageResult(rows));
	}

	@Transactional
	public Object addCredence(Credence credence){
		// TODO 验证数据合法性
		Date date = new Date();
		credence.setSt(date); // 设置时间戳
		credenceMapper.insert(credence);
		Map<String, Object> resMap = new HashMap<String, Object>();
		resMap.put("credence", credence);
		return  new ActionResult(resMap);
	}

	@Transactional
	public Object updateCredence(Credence credence){
		// TODO 验证数据合法性
		Date date = new Date();
		credence.setSt(date); // 设置时间戳
		credenceMapper.update(credence);
		Map<String, Object> resMap = new HashMap<String, Object>();
		resMap.put("credence", credence);
		return  new ActionResult(resMap);
	}

	@Transactional
	public Object removeCredence(HashMap<String,Object> input){
		Object credenceIds = input.get("credenceIds");
		if(credenceIds instanceof List){
			List<String> list = (List<String>) credenceIds;
			for (String credenceId : list) {
				credenceMapper.deleteById(credenceId);
			}
			return new InternalActionResult(true, "凭证删除成功！");
		} else {
			return new InternalActionResult(false, "凭证删除失败！");
		}
	}

}
