import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Post } from './post.model';

@Injectable({ providedIn: 'root' })
export class PostsService{
    constructor(private http: HttpClient){}

    createAndStorePost(title: string, content: string){
        const postData: Post = { title: title, content: content }
        this.http.post<{ name: string }>('https://http-demo-angular-yt-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json', postData).subscribe(res => {
            console.log(res);
        })
    }

    fetchPosts() {
        return this.http.get<{ [key: string]: Post }>('https://http-demo-angular-yt-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json')
            .pipe(map(res => {
                const posts: Post[] = [];
                for (const key in res) {
                    posts.push({ ...res[key], id: key })
                }
                return posts;
            }))
    }
}