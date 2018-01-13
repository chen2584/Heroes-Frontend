export interface Hero
{
    HeroID: string;
    HeroName: string;
    HeroDesc: string;
    HeroIMG: string;
    HeroVoted: number;
    HeroCommented: number;
}

export interface HeroSearch
{
    HeroID: string;
    HeroName: string;
}

export interface HeroComment
{
    CommentID: number;
    CommentGroup: number;
    Name: string
    Email: string
    Message: string
    CommentDate: string;
}

export interface PostComment {
    Name: string,
    Email: string,
    Message: string,
    HeroID: string
}