package in.chandanpal.loginregisterjwtmysql.service;

import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import in.chandanpal.loginregisterjwtmysql.model.AuthenticationRequest;
import in.chandanpal.loginregisterjwtmysql.model.AuthenticationResponse;
import in.chandanpal.loginregisterjwtmysql.model.User;
import in.chandanpal.loginregisterjwtmysql.util.JwtUtil;

@CrossOrigin
@RestController
public class AuthenticationService
{
    public static final Logger LOGGER = LoggerFactory.getLogger(RegistrationService.class);
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception
    {
        LOGGER.info("Entered login controller...");
        
        // try to authenticate using authentication manager (configured in web security configuration) of spring security
        try 
        {
            authenticationManager.authenticate
            (
                    new UsernamePasswordAuthenticationToken(authenticationRequest.getUserEmail(), authenticationRequest.getPassword())
            );
        }
        catch (BadCredentialsException e)
        {
            throw new Exception("Incorrect username or password", e);
        }
        
        LOGGER.debug("user email=" + authenticationRequest.getUserEmail());
        
        // if successfully authenticated - generate token and send a token
        //find user
        final User user = userService.findUserByEmail(authenticationRequest.getUserEmail());
        
        //generate token
        Date tokenExpDate = new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24);
        final String jwtToken = jwtUtil.generateToken(user, tokenExpDate);
        LOGGER.debug("jwtToken=" + jwtToken);
        
        AuthenticationResponse authResponse = new AuthenticationResponse(jwtToken);
        authResponse.setExpDate(tokenExpDate);
        System.out.println("user first name=" + user.getFirstName());
        authResponse.setFirstName(user.getFirstName());
        authResponse.setLastName(user.getLastName());
        
        return ResponseEntity.ok(authResponse);
    }
    
}
