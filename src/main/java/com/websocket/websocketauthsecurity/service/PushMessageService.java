package com.websocket.websocketauthsecurity.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class PushMessageService {

    @Autowired
    private SimpMessagingTemplate template;

    public void getMessages()throws InterruptedException {

        String[] strArray3 = {"Hi", "Hello","How Are You","Have A Nice Day", "Bye"};

        for (int i = 0; i < strArray3.length; i++) {
            Thread.sleep(3000);
            System.out.print("\n"+ strArray3[i]);
            template.convertAndSend("/topic/notification", strArray3[i]);
        }

    }
}
