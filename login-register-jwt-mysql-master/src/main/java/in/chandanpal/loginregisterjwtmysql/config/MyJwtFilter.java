package in.chandanpal.loginregisterjwtmysql.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import in.chandanpal.loginregisterjwtmysql.model.User;
import in.chandanpal.loginregisterjwtmysql.service.UserService;
import in.chandanpal.loginregisterjwtmysql.util.JwtUtil;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;

@Component
//We should use OncePerRequestFilter since we are doing a database call, there is no point in doing this more than once
public class MyJwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;
    
    @Autowired
	private UserService userService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException
    {
        // get authorization header
        final String authorizationHeader = request.getHeader("Authorization");
        
        String userEmail = null;
        String jwtToken = null;
        
        // extract token and user email from authorization header
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer "))
        {
            jwtToken = authorizationHeader.substring(7);
            userEmail = jwtUtil.extractUserEmail(jwtToken);
        }
        System.out.println("TEST:: jwtToken=" + jwtToken);//debug
        System.out.println("TEST:: userEmail=" + userEmail);//debug
        
        
        //if there is a email found in the token and it is not already authenticated
        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null)
        {
            // find user
            User user = userService.findUserByEmail(userEmail);
            
            // validate token and if token is invalid do nothing
            if (jwtUtil.validateToken(jwtToken, user))
            {
                // if token is valid - set authenticated
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(user, null, new ArrayList<>());
                usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
            }
        }
        
        // proceed to next filter
        chain.doFilter(request, response);
    }

}
