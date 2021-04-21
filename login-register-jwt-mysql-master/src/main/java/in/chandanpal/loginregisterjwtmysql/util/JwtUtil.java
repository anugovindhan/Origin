package in.chandanpal.loginregisterjwtmysql.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import in.chandanpal.loginregisterjwtmysql.model.User;

@Service
public class JwtUtil {

	@Value("${security.jwt.token.secret-key:secret-key}")
	private String SECRET_KEY;
	
	// claims = key value pair (extract all claims from JWT)
	private Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
    }
	
	// extract a specific claim form JWT
	public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }
	
	// extract user email (which we have set as subject in JWT) from JWT
    public String extractUserEmail(String token) {
        return extractClaim(token, Claims::getSubject);
    }
    
    // extract expiry date from JWT
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }
    
    // check if token is expired
    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }
    
    // generate a new token for a user
    public String generateToken(User user, Date expDate)
    {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, user.getEmail(), expDate);
    }
    
    // create token
    private String createToken(Map<String, Object> claims, String subject, Date expDate)
    {
        return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(expDate)
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY).compact();
    }
    
    // validate a token
    public Boolean validateToken(String token, User user) {
        final String userEmail = extractUserEmail(token);
        return (userEmail.equals(user.getEmail()) && !isTokenExpired(token));
    }

}