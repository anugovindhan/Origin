package in.chandanpal.loginregisterjwtmysql.config;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Bean
	public BCryptPasswordEncoder passwordEncoder () {
		return new BCryptPasswordEncoder();
	}
	
	@Autowired
    private DataSource dataSource;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@Value("${spring.queries.users-query}")
    private String usersQuery;
	
	@Autowired
	private MyJwtFilter myJwtFilter;
	
	@Override
	protected void configure(HttpSecurity httpSecurity) throws Exception {
		// Disable CSRF (cross site request forgery) because not using cookies
		httpSecurity.csrf().disable();
	    
		//enable cross-origin requests
	    httpSecurity.cors();
		
		//disable session because using JWT authorization
		httpSecurity.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		
		//access denied page
		//httpSecurity.exceptionHandling().accessDeniedPage("/login");
		
		// Entry points
		httpSecurity.authorizeRequests()
				.antMatchers("/register").permitAll() //permit registration api to everyone
				.antMatchers("/authenticate").permitAll() //permit authentication api to everyone
				.anyRequest().authenticated();// everything else to authenticated users
		
		// Apply JWT Filter
        httpSecurity.addFilterBefore(myJwtFilter, UsernamePasswordAuthenticationFilter.class);
	}
	
	
	@Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
	
	/**
	 * configure authentication manager
	 */
	@Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception
	{
        auth
            .jdbcAuthentication()
            .usersByUsernameQuery(usersQuery)
            .authoritiesByUsernameQuery("select email, 'ROLE' from user where email=?") //dummy query since authorization is not implememted
            .dataSource(dataSource)
            .passwordEncoder(bCryptPasswordEncoder);
    }
	
}
