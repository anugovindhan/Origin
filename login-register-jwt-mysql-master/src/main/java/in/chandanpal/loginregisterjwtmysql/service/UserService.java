package in.chandanpal.loginregisterjwtmysql.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import in.chandanpal.loginregisterjwtmysql.model.User;
import in.chandanpal.loginregisterjwtmysql.repository.UserRepository;

@Service("userService")
public class UserService {
	
	@Autowired
    private UserRepository userRepository;
    
    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    
    public User saveUser(User user)
    {
        return userRepository.save(user);
    }

}