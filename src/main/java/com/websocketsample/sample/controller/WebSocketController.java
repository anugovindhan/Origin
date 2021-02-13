package com.websocketsample.sample.controller;

import com.websocketsample.sample.modal.Notifications;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class WebSocketController {

    @Autowired
    private SimpMessagingTemplate template;

    // Initialize Notifications
    private Notifications notifications = new Notifications(0);

    @GetMapping("/notify")
    public String getNotification() throws InterruptedException {

//        // Increment Notification by one
//        notifications.increment();
//
//        // Push notifications to front-end
//        template.convertAndSend("/topic/notification", notifications);
        String[] strArray3 = {"Hi", "Hello","How Are You","Have A Nice Day", "Bye"};
//        for(int i=1;i<=5;i++){
//            Thread.sleep(3000);
//            template.convertAndSend("/topic/notification", i);
//            System.out.println("New\t "+ i);
//        }
        for (int i = 0; i < strArray3.length; i++) {
            Thread.sleep(3000);
            System.out.print(strArray3[i]);
            template.convertAndSend("/topic/notification", strArray3[i]);
        }

        return "Notifications successfully sent to Angular!";
    }

}
